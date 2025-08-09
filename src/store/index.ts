import resso from "resso";

export const store = resso({
  count:0,
  inc: ()=> {
    const {count} = store;
    store.count = count + 1;
  },
  inc2: () => {
    const {count} = store;
    store.count = count + 1;
  },
  token: '',
  userInfo: {
    username:'',
    role:'',
    id:1
  }
})
