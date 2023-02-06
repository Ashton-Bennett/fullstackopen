import illOne from "../../images/chat_bot.svg";
import illTwo from "../../images/undraw_code_thinking_re_gka2.svg";
import illThree from "../../images/undraw_content_team_re_6rlg.svg";
import illFour from "../../images/undraw_data_input_fxv2.svg";
import illFive from "../../images/undraw_data_processing_yrrv.svg";
import illSix from "../../images/undraw_engineering_team_a7n2.svg";
import illSeven from "../../images/undraw_firmware_re_fgdy.svg";
import illEight from "../../images/undraw_in_the_office_re_jtgc.svg";
import illNine from "../../images/undraw_next_tasks_re_5eyy.svg";
import illTen from "../../images/undraw_online_test_re_kyfx.svg";
import illEleven from "../../images/undraw_open_source_-1-qxw.svg";
import illTwelve from "../../images/undraw_pair_programming_re_or4x.svg";
import illThirteen from "../../images/undraw_programmer_re_owql.svg";
import illFourteen from "../../images/undraw_programming_re_kg9v.svg";
import illFifteen from "../../images/undraw_progressive_app_m-9-ms.svg";
import illSixteen from "../../images/undraw_remotely_-2-j6y.svg";
import illSeventeen from "../../images/undraw_secure_server_re_8wsq.svg";
import illEighteen from "../../images/undraw_server_cluster_jwwq.svg";

const Illastration = () => {
  const illastrationsArray = [
    illOne,
    illTwo,
    illThree,
    illFour,
    illFive,
    illSix,
    illSeven,
    illEight,
    illNine,
    illTen,
    illEleven,
    illTwelve,
    illThirteen,
    illFourteen,
    illFifteen,
    illSixteen,
    illSeventeen,
    illEighteen,
  ];

  const randomNumber = Math.floor(Math.random() * 18);
  return (
    <>
      <img
        src={illastrationsArray[randomNumber]}
        alt="tech illastration"
        style={{ maxWidth: "350px" }}
      />
    </>
  );
};
export default Illastration;
