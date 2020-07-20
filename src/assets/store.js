
import {createStore} from "redux";
import customerData from '../assets/data.json';
import reducer from '../reducers/reducer'

const LOCAL_STORAGE_NAME = "mystore";

class LocalStore {
  
    // Singleton property
    static DefaultStore = null;
  
    static getDefaultStore() {
      if (LocalStore.DefaultStore === null) {
        LocalStore.DefaultStore = new LocalStore();
      }
  
      return LocalStore.DefaultStore;
    }
  
    // Redux store
    _store = null;
  
    // When class instance is used, initialize the store
    constructor() {
      this.initStore()
    }
  
    // Initialization of Redux Store
    initStore() {
      this._store = createStore(reducer, LocalStore.loadState());
      this._store.subscribe(() => {
        LocalStore.saveState(this._store.getState());
      });
    }
  
    // Getter to access the Redux store
    get store() {
      return this._store;
    }
  
    // Loading persisted state from localStorage, no need to access
    // this method from the outside
    static loadState() {
      try {
        let serializedState = localStorage.getItem(LOCAL_STORAGE_NAME);
  
        if (serializedState === null) {
          return LocalStore.initialState();
        }
  
        return JSON.parse(serializedState);
      } catch (err) {
        return LocalStore.initialState();
      }
    }
  
    // Saving persisted state to localStorage every time something
    // changes in the Redux Store (This happens because of the subscribe() 
    // in the initStore-method). No need to access this method from the outside
    static saveState(state) {
      try {
        let serializedState = JSON.stringify(state);
        localStorage.setItem(LOCAL_STORAGE_NAME, serializedState);
      } catch (err) {}
    }
  
    // setting the initial store state to data.json 
    static initialState() {
        return {
          "customers": customerData.customers
      };
    }
  }
  
  export default LocalStore;