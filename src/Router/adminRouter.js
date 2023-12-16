
import { AuthContext } from '.';
import DocList from '../pages/AdminDash/Tabs/DocList';
import AddNew from '../pages/AdminDash/Tabs/AddNew';
import GenerateStats from '../pages/AdminDash/Tabs/GenerateStats';
import Feedbacks from '../pages/AdminDash/Tabs/Feedbacks';
import VerifySignUp from '../pages/AdminDash/Tabs/VerifySignUp';
import AdminDash from '../pages/AdminDash';


const adminRouter = (setUserType) => [
    {
        path: '/dashboard/admin',
        element: <AuthContext.Provider value={{ setUserType }}>
            <AdminDash />
        </AuthContext.Provider>
    },
    {
        path: `/dashboard/admin/doctors'-list`,
        element: <AuthContext.Provider value={{ setUserType }}>
            <DocList />
        </AuthContext.Provider>
    },
    {
        path: `/dashboard/admin/doctors'-list/add-new`,
        element: <AuthContext.Provider value={{ setUserType }}>
            <AddNew />
        </AuthContext.Provider>
    },
    {
        path: `/dashboard/admin/generate-stats`,
        element: <AuthContext.Provider value={{ setUserType }}>
            <GenerateStats />
        </AuthContext.Provider>
    },
    {
        path: `/dashboard/admin/verify-signup`,
        element: <AuthContext.Provider value={{ setUserType }}>
            <VerifySignUp />
        </AuthContext.Provider>
    },
    {
        path: `/dashboard/admin/generate-stats/feedbacks`,
        element: <AuthContext.Provider value={{ setUserType }}>
            <Feedbacks />
        </AuthContext.Provider>
    },
]

export default adminRouter