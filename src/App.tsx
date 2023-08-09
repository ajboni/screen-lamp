import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { FullScreenIcon, MenuIcon } from "./icons";
import { HexAlphaColorPicker, HexColorInput, HslaColor } from "react-colorful";
const senderChannel = new BroadcastChannel("bg-color");
const recevierChannel = new BroadcastChannel("bg-color");

function App() {
  const [bgColor, setBgColor] = useState("#FFF");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    recevierChannel.addEventListener("message", (event) => {
      setBgColor(event.data);
    });
  }, []);

  const MenuToggler = () => {
    return (
      <div className="absolute right-0 bottom-0 bg-emerald-400 opacity-90 flex flex-col gap-4 p-2 z-50">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <MenuIcon />
        </button>
      </div>
    );
  };

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
        className="absolute right-0 bottom-0 bg-emerald-700 text-white  p-8 w-full xl:w-[500px] flex flex-col gap-4 z-10  shadow "
      >
        <div>
          This little page lets you use your screen as a lightsource, useful for
          videocalls or recordings. For multi monitor set up, it syncs color
          between tabs.
        </div>

        <div className="flex gap-2 justify-center">
          <button>
            <FullScreenIcon />
          </button>

          <button>
            <FullScreenIcon />
          </button>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <HexAlphaColorPicker
            color={bgColor}
            onChange={(newColor) => senderChannel.postMessage(newColor)}
          />
          {/* 
              <HexColorInput
                color={bgColor}
                onChange={(newColor) => channel.postMessage(newColor)}
              />
              */}
        </div>
      </Transition>
    </div>
  );
}

export default App;
