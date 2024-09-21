import ApiV1AdminFileCreate from './apis/api.v1.admin.file.create.ts';
import ApiV1AdminOrderGetList from './apis/api.v1.admin.order.getList.ts';
import ApiV1AdminOrderUpdate from './apis/api.v1.admin.order.update.ts';
import ApiV1AdminProductAddImages from './apis/api.v1.admin.product.addImages.ts';
import ApiV1AdminProductCreate from './apis/api.v1.admin.product.create.ts';
import ApiV1AdminProductGetList from './apis/api.v1.admin.product.getList.ts';
import ApiV1AdminProductUpdate from './apis/api.v1.admin.product.update.ts';
import ApiV1AdminProductCategoryGetList from './apis/api.v1.admin.productCategory.getList.ts';
import ApiV1AuthAuthorize from './apis/api.v1.auth.authorize.ts';
import ApiV1AuthLogin from './apis/api.v1.auth.login.ts';
import ApiV1WebCartAddItem from './apis/api.v1.web.cart.addItem.ts';
import ApiV1WebCartCheckout from './apis/api.v1.web.cart.checkout.ts';
import ApiV1WebCartDecreaseItem from './apis/api.v1.web.cart.decreaseItem.ts';
import ApiV1WebCartGetOrCreate from './apis/api.v1.web.cart.getOrCreate.ts';
import ApiV1WebCartIncreaseItem from './apis/api.v1.web.cart.increaseItem.ts';
import ApiV1WebCartRemove from './apis/api.v1.web.cart.remove.ts';
import ApiV1WebCartRemoveItem from './apis/api.v1.web.cart.removeItem.ts';
import ApiV1WebCartUpdateItem from './apis/api.v1.web.cart.updateItem.ts';
import ApiV1WebCustomerCreate from './apis/api.v1.web.customer.create.ts';
import ApiV1WebCustomerGet from './apis/api.v1.web.customer.get.ts';
import ApiV1WebProductGet from './apis/api.v1.web.product.get.ts';
import ApiV1WebProductGetList from './apis/api.v1.web.product.getList.ts';
import ApiV1WebProductCategoryGetList from './apis/api.v1.web.productCategory.getList.ts';

export const handlers = [
  ApiV1AdminFileCreate,
  ApiV1AdminOrderGetList,
  ApiV1AdminOrderUpdate,
  ApiV1AdminProductAddImages,
  ApiV1AdminProductCreate,
  ApiV1AdminProductGetList,
  ApiV1AdminProductUpdate,
  ApiV1AdminProductCategoryGetList,
  ApiV1AuthAuthorize,
  ApiV1AuthLogin,
  ApiV1WebCartAddItem,
  ApiV1WebCartCheckout,
  ApiV1WebCartDecreaseItem,
  ApiV1WebCartGetOrCreate,
  ApiV1WebCartIncreaseItem,
  ApiV1WebCartRemove,
  ApiV1WebCartRemoveItem,
  ApiV1WebCartUpdateItem,
  ApiV1WebCustomerCreate,
  ApiV1WebCustomerGet,
  ApiV1WebProductGet,
  ApiV1WebProductGetList,
  ApiV1WebProductCategoryGetList
];
