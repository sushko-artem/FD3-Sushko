import { Mobile } from "@features/Mobile/Mobile";
import { Provider } from "react-redux";
import { store } from "@redux/store";

export const App = () => (
  <Provider store={store}>
    <div className="container mx-auto px-3 sm:px-4 lg:px-5">
      <Mobile />
    </div>
  </Provider>
);
