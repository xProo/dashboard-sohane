
import { Image, Typography } from "antd";

function AppHeader() {
  return (
    <div className="AppHeader">
      <Image
        width={75}
        src="https://vmed.fr/_nuxt/poster-video-vmed.0b0d10b5.png"
      ></Image>
      <Typography.Title>Vmed's Dashboard</Typography.Title>
      <div>
      </div>
    </div>
  );
}
export default AppHeader;
