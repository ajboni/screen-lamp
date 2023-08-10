import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { FullScreenIcon, MenuIcon } from "./icons";
import { SketchPicker } from "react-color";
const senderChannel = new BroadcastChannel("bg-color");
const recevierChannel = new BroadcastChannel("bg-color");

function App() {
  const [bgColor, setBgColor] = useState(
    localStorage.getItem("color") || "#FFF"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    recevierChannel.addEventListener("message", (event) => {
      setBgColor(event.data);
      localStorage.setItem("color", event.data);
    });
  }, []);

  const MenuToggler = () => {
    return (
      <div className="absolute right-0 bottom-0 bg-emerald-900 opacity-90 flex flex-col gap-4 p-2 z-50 text-white">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <MenuIcon />
        </button>
      </div>
    );
  };

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else document.exitFullscreen();
  }

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="relative w-screen h-screen"
    >
      <MenuToggler />

      <Transition
        show={isMenuOpen}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute right-0 bottom-0 bg-emerald-800 text-white  p-12 w-full sm:w-[440px] flex flex-col gap-4 z-10  shadow items-center"
      >
        <div className="text-3xl">ScreenLamp</div>
        <div>
          This little page lets you use your screen as a lightsource of
          customizable color, useful for videocalls, reading or recordings. For
          multi monitor set up, it syncs color between tabs in realtime.
        </div>
        <div className="flex gap-2 justify-center">
          <button className="flex gap-2" onClick={toggleFullScreen}>
            <FullScreenIcon /> Toggle Fullscreen
          </button>
        </div>
        <div className="items-center justify-center text-black">
          <SketchPicker
            width="100%"
            className="!box-border"
            color={bgColor}
            // https://planetpixelemporium.com/tutorialpages/light.html
            presetColors={[
              { title: "White", color: "#FFFFFF" },
              { title: "High Noon Sun", color: "#fffffb" },
              { title: "Carbon Arc", color: "#fffaf4" },
              { title: "Halogen", color: "#fff1e0" },
              { title: "100W Tungsten", color: "#ffd6aa" },
              { title: "40W Tungsten", color: "#ffc58f" },
              { title: "Candle", color: "#ff9329" },
              { title: "Warm Fluorescent", color: "#fff4e5" },
              { title: "Standard Fluorescent", color: "#f4fffa" },
              { title: "Cool White Fluorescent", color: "#d4ebff" },
              { title: "Full Spectrum Fluorescent", color: "#fff4f2" },
              { title: "Grow Light Fluorescent", color: "#ffeff7" },
              { title: "Black Light Fluorescent", color: "#a700ff" },
              "#000000",
              "#1d2021",
              "#282828",
              "#32302f",
              "#3c3836",
              "#504945",
              "#665c54",
              "#7c6f64",
            ]}
            onChange={(newColor: any) =>
              senderChannel.postMessage(newColor.hex)
            }
          />
        </div>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=ajboni&repo=screen-lamp&type=star&count=true&size=large"
          width="170"
          height="30"
          title="GitHub"
        ></iframe>
      </Transition>
    </div>
  );
}

export default App;
