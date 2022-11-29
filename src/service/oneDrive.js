import request from '../utils/request';
import {stringify} from 'qs';
import {proxyData} from '@/utils/proxy';
import fetch from "dva";

export async function getListData(params) {
  return request.get(`${proxyData}/list?${stringify(params)}`);
}


export async function getHost() {
  return proxyData
}

export async function getList(proxyData) {
  const url = `${proxyData}/list`;
  const response = await fetch(url, { mode: "cors" });
  return await response.json();
}

export async function getListByNext(proxyData, next) {
  const url = `${proxyData}/list`;
  const postData = {
    next: next
  };
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    },
    mode: "cors",
    method: "POST",
    body: JSON.stringify(postData)
  });
  return await response.json();
}

export async function getListByPath(proxyData, path) {
  const url = `${proxyData}/list?path=${path}`;
  const response = await fetch(url, { mode: "cors" });
  return await response.json();
}

export async function verify(proxyData, code) {
  const response = await fetch(`${proxyData}/verify?code=${code}`, { mode: "cors" });
  return await response.json();
}

export async function getStatus(proxyData) {
  const response = await fetch(`${proxyData}/`, { mode: "cors" });
  let result = {};
  let data = [];
  if (response.status !== 200) {
    data = [{ color: "red", text: "函数计算服务异常" }];
  } else {
    let data_json = await response.json();
    data.push({ color: "green", text: "函数计算服务正常" });
    const oss_available = data_json["oss_available"];
    if (oss_available) {
      data.push({ color: "green", text: "对象存储服务正常" });
    } else {
      data.push({ color: "red", text: "对象存储服务异常" });
    }
    const success = data_json["success"];
    if (success) {
      data.push({ color: "green", text: "已登录OneDrive账号" });
      result["account"] = data_json["account"];
    } else {
      data.push({ color: "red", text: "未登录OneDrive账号" });
    }
  }
  result["data"] = data;
  return result;
}
