export default function checkEnvironment(): string {
  const envUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://154.12.227.44:3000'
      : 'http://154.12.227.44:3000';

  //'https://trello-sepia-gamma.vercel.app

  return envUrl;
}
