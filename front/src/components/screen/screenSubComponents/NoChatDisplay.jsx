import background from "../../../assets/images/lego-background.svg";
function NoChatDisplay() {
  return (
    <div className="absolute w-full h-full font-bold  bg-msg_bg bg-cover sm:relative  sm:w-[55%] md:w-[60%] lg:w-[70%] ">
      <ul className="text-lg [&>*]:mx-auto sm:mt-[35%] md:mt-[20%] lg:mt-[15%] xl:mt-[10%]">
        <li className="font-caglisotro text-5xl flex justify-center">
          Namaste
        </li>
        <li className="text-prim1 flex justify-center text-3xl mt-4">
          From <span className="text-seco2 mx-3 "> Lego </span>Kutumb
        </li>
      </ul>
      <img
        src={background}
        alt=""
        className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[50%] mx-auto mt-[8%]"
      />
    </div>
  );
}

export default NoChatDisplay;
