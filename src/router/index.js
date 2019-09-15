import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '@/config/util'
import Login from '@/views/login'
import Index from '@/views/index'
const Home = () => import('@/views/home')
const MemberSignin = () => import('@/views/memberSignin')
const CoachSignin = () => import('@/views/coachSignin')
const RemoveCourse = () => import('@/views/removeCourse')
const OrderExperience = () => import('@/views/orderExperience')
const OrderCourse = () => import('@/views/orderCourse')
const PayCash = () => import('@/views/payCash')
const Member = () => import('@/views/member')
const MemberCard = () => import('@/views/memberCard')
const RenewalCard = () => import('@/components/RenewalCard')
const TransferCard = () => import('@/components/transferCard')
const Course = () => import('@/views/course')
const Worker = () => import('@/views/worker')
const Trainer = () => import('@/views/trainer')
const WorkerDetail = () => import('@/views/workerDetail')
const VenueManage = () => import('@/views/venueManage')
const VenueInfo = () => import('@/views/venueInfo')
const MessageNotice = () => import('@/views/messageNotice')
const AdminChange = () => import('@/views/adminChange')
const BusinessData = () => import('@/views/businessData')
const AddMember = () => import('@/components/addMember')
const HomeSurvey = () => import('@/views/homeSurvey')
const SalesReport = () => import('@/views/salesReport')
const RemoveCourseReport = () => import('@/views/removeCourseReport')
const PrivateSaleReport = () => import('@/views/privateSaleReport')
const FinancialChart = () => import('@/views/financialChart')
const MemberInfoDetail = () => import('@/views/memberInfoDetail')
const BuyCards = () => import('@/components/BuyCards')
const ViewAppointment = () => import('@/views/viewAppointment')
const AddCourse = () => import('@/components/course/addCourse')
const BatchCourse = () => import('@/views/batchCourse')
const SelfCourse = () => import('@/views/selfCourse')
const SelfOrderEdit = () => import('@/components/course/selfOrderEdit')
const AddSelfCourse = () => import('@/components/course/addSelfCourse')
const SelfCourseDetail = () => import('@/views/selfCourseDetail')
const EditWorkerInfo = () => import('@/views/editWorkerInfo')
const PermissionSet = () => import('@/views/permissionSet')
const CoachPermissionSet = () => import('@/views/coachPermissionSet')
const CourseDetail = () => import('@/views/courseDetail')
const EditCoachInfo = () => import('@/views/editCoachInfo')
const CoachDetail = () => import('@/views/coachDetail')
const BuyPrivate = () => import('@/views/buyPrivate')
const ContinuePrivate = () => import('@/views/continuePrivate')
const ClassSchedule = () => import('@/components/course/classSchedule')
const HardWare = () => import('@/views/hardWare')
Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {path: '/home', name: 'home', component: Home},
        {path: '/memberSignin', name: 'memberSignin', component: MemberSignin},
        {path: '/coachSignin', name: 'coachSignin', component: CoachSignin},
        {path: '/removeCourse', name: 'removeCourse', component: RemoveCourse},
        {path: '/orderExperience', name: 'orderExperience', component: OrderExperience},
        {path: '/orderCourse', name: 'orderCourse', component: OrderCourse},
        {path: '/orderCourse/viewAppointment', name: 'viewAppointment', component: ViewAppointment},
        {path: '/payCash', name: 'payCash', component: PayCash},
        {path: '/member', name: 'member', component: Member},
        {path: '/member/addMember', name: 'addMember', component: AddMember},
        {path: '/member/memberInfoDetail', name: 'memberInfoDetail', component: MemberInfoDetail},
        {path: '/member/BuyCards', name: 'BuyCards', component: BuyCards},
        {path: '/member/buyPrivate', name: 'buyPrivate', component: BuyPrivate},
        {path: '/memberCard', name: 'memberCard', component: MemberCard},
        {path: '/memberCard/RenewalCard', name: 'RenewalCard', component: RenewalCard},
        {path: '/memberCard/TransferCard', name: 'transferCard', component: TransferCard},
        {path: '/course', name: 'course', component: Course},
        {path: '/course/addCourse', name: 'addCourse', component: AddCourse},
        {path: '/course/courseDetail', name: 'courseDetail', component: CourseDetail},
        {path: '/course/batchCourse', name: 'batchCourse', component: BatchCourse},
        {path: '/course/classSchedule', name: 'classSchedule', component: ClassSchedule},
        {path: '/worker', name: 'worker', component: Worker},
        {path: '/worker/workerDetail', name: 'workerDetail', component: WorkerDetail},
        {path: '/worker/adminChange', name: 'adminChange', component: AdminChange},
        {path: '/worker/editWorkerInfo', name: 'editWorkerInfo', component: EditWorkerInfo},
        {path: '/worker/permissionSet', name: 'permissionSet', component: PermissionSet},
        {path: '/trainer', name: 'trainer', component: Trainer},
        {path: '/trainer/coachPermissionSet', name: 'coachPermissionSet', component: CoachPermissionSet},
        {path: '/trainer/coachDetail', name: 'coachDetail', component: CoachDetail},
        {path: '/trainer/editCoachInfo', name: 'editCoachInfo', component: EditCoachInfo},
        {path: '/venueManage', name: 'venueManage', component: VenueManage},
        {path: '/venueInfo', name: 'venueInfo', component: VenueInfo},
        {path: '/messageNotice', name: 'messageNotice', component: MessageNotice},
        {path: '/businessData', name: 'businessData', component: BusinessData},
        {path: '/homeSurvey', name: 'homeSurvey', component: HomeSurvey},
        {path: '/salesReport', name: 'salesReport', component: SalesReport},
        {path: '/removeCourseReport', name: 'removeCourseReport', component: RemoveCourseReport},
        {path: '/privateSaleReport', name: 'privateSaleReport', component: PrivateSaleReport},
        {path: '/financialChart', name: 'financialChart', component: FinancialChart},
        {path: '/selfCourse', name: 'selfCourse', component: SelfCourse},
        {path: '/selfCourse/addSelfCourse', name: 'addSelfCourse', component: AddSelfCourse},
        {path: '/selfCourse/selfOrderEdit', name: 'selfOrderEdit', component: SelfOrderEdit},
        {path: '/selfCourse/selfCourseDetail', name: 'selfCourseDetail', component: SelfCourseDetail},
        {path: '/selfCourse/continuePrivate', name: 'continuePrivate', component: ContinuePrivate},
        {path: '/hardWare', name: 'hardWare', component: HardWare}
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  const token = getToken()
  if (!token && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else {
    next()
  }
})

export default router
