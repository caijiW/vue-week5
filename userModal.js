let myModal = '';

export default {
  data() {
    return {
      myModal: '',
      qty: 1
    }
  },
  props: ['product'],
  template: `
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal" >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span >{{ product.title }}</span>
          </h5>
            <button type="button" class="btn-close"
                    data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-6">
                <img class="w-100 h-auto" :src="product.imageUrl" alt="product.title">
          </div>
              <div class="col-sm-6">
                <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
                <p>商品描述：{{ product.description }}</p>
                <p>商品內容：{{ product.content }}</p>
                <div v-if="product.price">
                    <del class="h6">原價 {{ product.origin_price }} 元</del>
                    <div class="h5">現在只要 {{ product.price }} 元</div>
                </div>
                                <div v-else class="h5">{{ product.origin_price }} 元</div>
                <div>
                  <div class="input-group">
                  <select name="cartNum" id="" v-model="qty">
                  <option :value="num" v-for="num in 20" >{{ num }}</option>
              </select>
                    <button type="button" class="btn btn-primary" @click="$emit('addToCart',product.id,qty)">加入購物車</button>
          </div>
          </div>
          </div>
              
          </div>
          </div>
          </div>
          </div>
          </div>
     `,
  mounted() {
    this.myModal = new bootstrap.Modal(document.getElementById('productModal', {
      keyboard: false,
      backdrop: 'static'
    }));



  },
  methods: {
    openModal() {
      this.myModal.show();

    },
    closeModal() {
      this.myModal.hide();
      this.qty = 1;
    }
  },

}