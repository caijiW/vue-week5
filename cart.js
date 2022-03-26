const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'caiji-hexschool';

import userProductModal from './userModal.js'
// 表單驗證
Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
});


// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    //   validateOnInput: true, // 打開的話：輸入文字時，就立即進行驗證
});



const app = Vue.createApp({
    data() {
        return {
            products: [],
            product: {},
            loadingWatchMore: '',
            loadingAddCart: '',
            loadingdelCart: '',
            loadingdelCarts: false,
            loadingTotalPrice: false,
            cartData: {},
            qty: 0,
            formData: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: ''

                },
                message: ''
            },
            //全螢幕loading
            isLoading: false

        }
    },
    mounted() {
        this.addLoading();
        this.getProducts();
        this.getCart();

    },
    methods: {
        getProducts() {
            axios.get(`${url}/api/${path}/products/all`)
                .then((res) => {
                    console.log(res);
                    this.products = res.data.products;
                    this.closeLoading();
                })
                .catch((err) => {
                    console.log(err);
                })

        },
        openModal(id) {
            this.$refs.userProductModal.openModal();    
            this.loadingWatchMore = id;
            this.product = {};
            axios.get(`${url}/api/${path}/product/${id}`)
                .then((res) => {
                    console.log(res);
                    this.product = res.data.product;
                    this.loadingWatchMore = '';
                })
                .catch((err) => {
                    console.log(err);
                })

        },
        getCart() {
            this.loadingTotalPrice = true;
            axios.get(`${url}/api/${path}/cart`)
                .then((res) => {
                    console.log(res);
                    this.cartData = res.data.data;
                    this.loadingTotalPrice = false;
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        addToCart(id, qty = 1) {
            this.loadingAddCart = id;
            
            const data = {
                product_id: id,
                qty: qty
            }
            axios.post(`${url}/api/${path}/cart`, { data })
                .then((res) => {
                    console.log(res);
                    this.$refs.userProductModal.closeModal();
                    this.getCart();
                    this.loadingAddCart = '';
                })
                .catch((err) => {
                    console.log(err);
                })

        },
        updateCartItem(item) {
            // console.log('updateCart', id, num);

            const data = {
                product_id: item.product_id,
                qty: item.qty
            };
            axios.put(`${url}/api/${path}/cart/${item.id}`, { data })
                .then((res) => {
                    console.log(res);

                    this.$refs.userProductModal.closeModal();
                    this.loadingAddCart = '';
                    this.getCart();
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        delFromCart(id) {
            this.loadingdelCart = id;
            axios.delete(`${url}/api/${path}/cart/${id}`)
                .then((res) => {
                    console.log(res);
                    this.getCart();
                    this.loadingdelCart = '';
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        delCarts() {
            this.loadingdelCarts = true;

            axios.delete(`${url}/api/${path}/carts`)
                .then((res) => {
                    console.log(res);
                    this.getCart();
                    this.loadingdelCarts = false;
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        addLoading() {
            this.isLoading = true;
            // setTimeout(() => {
            //   this.isLoading = false
            // }, 3000);
        },
        closeLoading() {
            this.isLoading = false
        },
        isPhone(value) {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '需要正確的電話號碼'
        },
        createOrder() {
            console.log('onsubmit');
            const form = this.formData;
            axios.post(`${url}/api/${path}/order`, { data: form })
                .then((res) => {

                    console.log(res);
                    this.$refs.form.resetForm();
                    this.getCart();
                })
                .catch((err) => {
                    console.log(err);
                })
        }

    },



})

app.component('userModal', userProductModal);
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);
app.component('loading', VueLoading);

app.mount('#app');