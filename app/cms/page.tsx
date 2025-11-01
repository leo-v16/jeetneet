
import { headers } from 'next/headers';

export default function CmsPage() {
  const headersList = headers();
  const authorization = headersList.get('authorization');

  if (authorization) {
    const [scheme, encoded] = authorization.split(' ');
    if (scheme === 'Basic' && encoded) {
      const decoded = Buffer.from(encoded, 'base64').toString();
      const [username, password] = decoded.split(':');

      if (
        username === process.env.CMS_USERNAME &&
        password === process.env.CMS_PASSWORD
      ) {
        return (
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="container mx-auto p-8">
              <h1 className="text-4xl font-bold mb-8">Content Management System</h1>
              <p>Welcome, {username}! You can manage your content here.</p>
            </div>
          </div>
        );
      }
    }
  }

  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
