
import App from './App';
import One from './component/one';
import Two from './component/two';

const routes = [
    {
        path: "/dashboard/",
        exact: true,
        main: App
    },
    {
        path: "/dashboard/one",
        main: One
    },
    {
        path: "/dashboard/two",
        main: Two
    }
];
export default routes