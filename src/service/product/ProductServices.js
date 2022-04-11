import api from '../api'
export default {
    ProductHome(ctname){
        return api().post('producthome',ctname);
    },
    ViewCategories(){
        return api().get('viewcategories');
    },
    detailProduct(pdId){
        return api().get('detailproduct/'+pdId);
    },
    viewSize(pdId){
        return api().get('viewsize/'+pdId);
    },
    viewProduct(productName){
        return api().post('viewproduct',productName);
    }

}