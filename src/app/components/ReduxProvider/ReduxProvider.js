"use client";
import { Provider } from "react-redux";
import store from "@/app/store/store";
import APP from "../APP/APP";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const ReduxProvider = ({ children }) => {
  const pathname = usePathname();
  return (
    <Provider store={store}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit = {{opacity: 1}}
          transition={{ duration: 0.8 }}
        >
          <APP children={children} />
        </motion.div>
      </AnimatePresence>
    </Provider>
  );
};

export default ReduxProvider;
