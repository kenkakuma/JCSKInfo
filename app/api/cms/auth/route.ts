import { NextRequest, NextResponse } from 'next/server'

/**
 * Sveltia CMS OAuth 认证 API
 * 
 * 处理 GitHub OAuth 认证流程
 * 参考: https://github.com/sveltia/sveltia-cms/blob/main/docs/getting-started.md#authentication
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  
  // Step 1: 如果没有 code，重定向到 GitHub 授权页面
  if (!code) {
    const clientId = process.env.OAUTH_GITHUB_CLIENT_ID
    
    if (!clientId) {
      return NextResponse.json(
        { error: 'OAuth not configured. Please set OAUTH_GITHUB_CLIENT_ID in environment variables.' },
        { status: 500 }
      )
    }

    // GitHub OAuth 授权 URL
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize')
    githubAuthUrl.searchParams.set('client_id', clientId)
    githubAuthUrl.searchParams.set('scope', 'repo,user')
    githubAuthUrl.searchParams.set('redirect_uri', `${request.nextUrl.origin}/api/cms/auth`)
    
    return NextResponse.redirect(githubAuthUrl.toString())
  }
  
  // Step 2: 使用 code 交换 access_token
  try {
    const clientId = process.env.OAUTH_GITHUB_CLIENT_ID
    const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET
    
    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: 'OAuth credentials not configured' },
        { status: 500 }
      )
    }

    // 向 GitHub 请求 access_token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      return NextResponse.json(
        { error: tokenData.error_description || 'GitHub OAuth failed' },
        { status: 400 }
      )
    }

    // Step 3: 将 token 返回给 CMS
    // 使用 postMessage 将 token 发送回 CMS 页面
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>OAuth Success</title>
</head>
<body>
  <script>
    // 将认证信息发送给 CMS
    (function() {
      function receiveMessage(e) {
        console.log("Receiving message:", e);
        
        // 验证消息来源
        if (e.origin !== window.location.origin) {
          console.warn("Message from invalid origin:", e.origin);
          return;
        }
        
        if (e.data === "authorizing:github") {
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify(tokenData)}',
            e.origin
          );
          
          // 关闭窗口
          setTimeout(function() {
            window.close();
          }, 100);
        }
      }
      
      window.addEventListener("message", receiveMessage, false);
      
      // 通知父窗口认证完成
      window.opener.postMessage(
        'authorization:github:success:${JSON.stringify(tokenData)}',
        window.location.origin
      );
      
      // 自动关闭窗口
      setTimeout(function() {
        window.close();
      }, 1000);
    })();
  </script>
  <p>Authorization successful! This window should close automatically...</p>
  <p>If not, please close this window manually.</p>
</body>
</html>
    `

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.json(
      { error: 'OAuth authentication failed' },
      { status: 500 }
    )
  }
}

