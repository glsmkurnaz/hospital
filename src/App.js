import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hastalar from "./pages/Hastalar";
import HastaEkle from "./pages/HastaEkle";
import RandevuEkle from "./pages/RandevuEkle";
import HastaDetay from "./pages/HastaDetay";
import RandevuDetay from "./pages/RandevuDetay";
import ResimDeneme from "./pages/ResimDeneme";

import api from "./api/api";
import urls from "./api/urls";

import { useDispatch } from "react-redux";
import actionTypes from "./redux/actions/actionTypes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: actionTypes.FETCH_HASTALAR_START });
    api
      .get(urls.hastalar)
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_HASTALAR_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.FETCH_HASTALAR_FAIL,
          payload: "Hastaları Çekerken Hata Oluştu",
        });
      });
    dispatch({ type: actionTypes.FETCH_RANDEVULAR_START });
    api
      .get(urls.randevular)
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_RANDEVULAR_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.FETCH_RANDEVULAR_FAIL,
          payload: "Randevuları Çekerken Hata Oluştu",
        });
      });
    dispatch({ type: actionTypes.FETCH_ISLEMLER_START });
    api
      .get(urls.islemler)
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_ISLEMLER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.FETCH_ISLEMLER_FAIL,
          payload: "İşlemleri Çekerken Hata Oluştu",
        });
      });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hastalar" element={<Hastalar />} />
        <Route path="/hasta-ekle" element={<HastaEkle />} />
        <Route path="/randevu-ekle" element={<RandevuEkle />} />
        <Route path="/hasta-detay/:hastaId" element={<HastaDetay />} />
        <Route path="/randevu-detay/:randevuId" element={<RandevuDetay />} />
        <Route path="/resim-yukle" element={<ResimDeneme />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/* {
      "id": "1",
      "date": "17.09.2022",
      "hastaId": "1665771204200"
    } */
