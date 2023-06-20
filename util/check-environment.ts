export default function checkEnvironment(): string {
  const envUrl =
    process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'http://38.242.149.14:5000';

  console.log(envUrl);

  //'https://trello-sepia-gamma.vercel.app

  return envUrl;
}
