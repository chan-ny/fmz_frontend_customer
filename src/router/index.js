import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/AboutOwn";
import Login from "../views/serviceInto/Login";
import Register from "../views/serviceInto/Register";
import CategoriyView from "../views/Categories";
import Error from "../callsystem/Error";
import SearchProduct from "../components/Product/SearchProduct";
import Transfer from "../components/Transfer/Transfer";
import AddProduct from "../components/Sales/AddProduct";
import Transactions from "../components/Sales/Transactions";
import DatatCustomer from "../views/serviceInto/DataCustomers";
import ChangePassword from "../views/serviceInto/ChangePassword";
import DetailProduct from "../components/Product/DisplayDetailProduct";
import Formatpassword from "../views/serviceInto/FormatPassword";
import ResetPassword from '../views/serviceInto/ResetPassword'


Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: Home
  },
  {
    path: "/reset",
    name: "ResetPassword",
    component: ResetPassword,
    meta: {
      allowAccess: true
    }
  },
  {
    path: "/format",
    name: "Formatpassword",
    component: Formatpassword,
    meta: {
      allowAccess: true
    }
  },

  {
    path: "/error",
    name: "Error",
    component: Error,
    meta: {
      allowAccess: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      allowAccess: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      allowAccess: true
    }
  },
  {
    path: "/searchProduct",
    name: "SearchProduct",
    component: SearchProduct,
    meta: {
      allowAccess: true,
      breadcrumb: [{ name: "ໜ້າແລກ", href: "Home" }, { name: "ຄົ້ນຫາສິນຄ້າ" }]
    }
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      allowAccess: true
    }
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      allowAccess: true,
      breadcrumb: [{ name: "ກ່ຽວກັບເຮົາ", href: "About" }]
    }
  },

  {
    path: "/category",
    name: "Category",
    component: CategoriyView,
    meta: {
      allowAccess: true,
      breadcrumb: [{ name: "ໜ້າແລກ", href: "Home" }, { name: "ປະເພດສິນຄ້າ" }]
    }
  },

  /// point transfer product
  {
    path: "/transfer",
    name: "Transfer",
    component: Transfer,
    meta: {
      allowAccess: true,
      breadcrumb: [{ name: "ໜ້າແລກ", href: "Home" }, { name: "ໂອນເງິນ" }]
    }
  },

  /// point add product
  {
    path: "/addproduct",
    name: "AddProduct",
    component: AddProduct,
    meta: {
      allowAccess: true,
      breadcrumb: [{ name: "ໜ້າແລກ", href: "Home" }, { name: "ຊື້ສິນຄ້າ" }]
    }
  },
  {
    path: "/detailproduct",
    name: "DetailProduct",
    component: DetailProduct,
    meta: {
      allowAccess: true,
      breadcrumb: [{ name: "ໜ້າແລກ", href: "Home" }, { name: "ລາຍລະອຽດ" }]
    }
  },

  /// transaction
  {
    path: "/transactions",
    name: "Transactions",
    component: Transactions,
    meta: {
      allowAccess: true,
      breadcrumb: [{ name: "Home", href: "Home" }, { name: "ດຳເນີນການ" }]
    }
  },

  /// data customer
  {
    path: "/datatCustomer",
    name: "DatatCustomer",
    component: DatatCustomer,
    meta: {
      allowAccess: true,
      breadcrumb: [{ name: "DatatCustomer" }]
    }
  },
  {
    path: "/change",
    name: "ChangePassword",
    component: ChangePassword,
    meta: {
      allowAccess: true,
      breadcrumb: [
        { name: "ປ່ຽນແປ່ງນ", href: "DatatCustomer" },
        { name: "ປ່ຽນແປ່ງລະຫັດຜ່ານ" }
      ]
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
