import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../hooks";
import { toggleLocale } from "../../store/modules/app";

export default function Console() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <div>
      <h2>Console</h2>

      <button onClick={() => dispatch(toggleLocale())}>{t("btn1")}</button>
    </div>
  );
}
