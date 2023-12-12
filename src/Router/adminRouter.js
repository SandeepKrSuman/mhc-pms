import AdminDash from '../components/Dashboards/AdminDash/AdminDash';
import DocList from '../components/Dashboards/AdminDash/Tabs/DocList';
import AddNew from '../components/Dashboards/AdminDash/Tabs/AddNew';
import GenerateStats from '../components/Dashboards/AdminDash/Tabs/GenerateStats';
import VerifySignUp from '../components/Dashboards/AdminDash/Tabs/VerifySignUp';
import Feedbacks from '../components/Dashboards/AdminDash/Tabs/Feedbacks';


const adminRouter = [
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