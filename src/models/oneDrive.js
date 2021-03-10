import {getListData} from "@/service/oneDrive";
import {history} from 'umi'

export default {
  namespace: 'oneDrive',
  state: {
    data: [],
    next: null
  },
  effects: {
    *fetchData({payload}, {call, put}) {
      const response = yield call(getListData, payload)
      if (response.data) {
        yield put({
          type: 'queryData',
          payload: response
        })
      }
    },
    *goPage({payload}, { put}) {
        yield put({
          type: 'queryData',
          payload: { data:[],next: null }
        })
       history.push(payload.url)
    },
  },
  reducers: {
    queryData(state, {payload}) {
      return {
        ...state,
        data: payload.data,
        next: payload.next || null
      }
    }
  },

}
