import React from "react";
import "../App.css";
import Time from "../components/Time";
import { useState } from "react";
import Date from "../components/Date";
import Weather from "../components/Weather";
import Quotes from "../components/Quotes";
import { BsFillCalendarDateFill } from "react-icons/bs";
import Bookmark from "../components/Bookmark";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {  Button, Modal, Form, Input  } from 'antd';

import CalendarComponent from "../components/Calendar";

export default function Homepage({ url }) {
  const [isModalOpen, setIsModalOpen2] = useState(false);
  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleOk = () => {
    setIsModalOpen2(false);
  };
  const handleCancel = () => {
    setIsModalOpen2(false);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [showModal, setShowModal] = useState(false);
  let navigate = useNavigate();

  const [touchPosition, setTouchPosition] = useState(null);

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleMouseDown = (e) => {
    const touchDown = e.screenX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      navigate("/kanban");
    }

    // if (diff < -5) {
    // 	prev();
    // }

    setTouchPosition(null);
  };

  const handleMouseMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.screenX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      navigate("/kanban");
    }

    // if (diff < -5) {
    // 	prev();
    // }

    setTouchPosition(null);
  };

  var marks = localStorage.getItem("bookmarks")
  let bookmarks = JSON.parse(marks)

  function delBookmark(ind){
    bookmarks.splice(ind,1)
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
  }

  return (
    <motion.div
      className=" image h-screen bg-no-repeat bg-cover absolute"
      style={{ backgroundImage: `url(${url})` }}
      initial={{ x: -window.innerWidth }}
      animate={{ x: 0, transition: { type: "tween" } }}
      // transition={{ type: "tween" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      exit={{ x: -window.innerWidth, opacity: 0, transition: { delay: 0.25 } }}
    >
      <button
        className="absolute bottom-0 right-0 py-6 sm:py-2 px-6 sm:px-4  transition
        duration-150
        ease-in-out"
        onClick={() => {
          showModal ? setShowModal(false) : setShowModal(true);
          console.log(showModal);
        }}
      >
        <BsFillCalendarDateFill color="white " className="calendar-icon" />
      </button>

      <Link to="/kanban">
        <div className="absolute right-8 top-[50%] h-16 w-16 rounded-full">
          <svg
            width={"100%"}
            height={"100%"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z" />
          </svg>
        </div>
      </Link>
      <div className="App">
        <div className="msg  text-bold text-white">
          <Time />
          <Date />
          <Weather
            cityName={"mumbai"} //This is a temporary name we can have different city names.
            apiKey={"a045d78dfc153d0c97dd1e87653d1ced"} //fill the api key here to make the widget work.
          />
          <Bookmark />
          {/* Modal Render  */}
          {showModal ? (
            <>
              <div
                className="calendar-position"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <div className="calendar">
                  <CalendarComponent />
                </div>
              </div>
            </>
          ) : null}
          {/* Modal Render End  */}
        </div>
        <Quotes />
          <div id="settings-icon">
            <img src="/settings.png" alt="jin" onClick={showModal2} className="hover:scale-125 hover:duration-500"/>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="grid justify-items-center"
              >

                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Location"
                  name="location"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your location!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
              <div className="bookmarks">
                {bookmarks.map((item, index) => (
                  <div key={index} className="flex place-items-center">
                    <h3 className="font-semibold text-lg mr-3">{item.image}</h3>
                    <a href={item.url} className="text-body text-base font-normal text-blue-600">{item.url}</a>
                    <button className="text-gray-50 bg-red-600 text-body text-sm rounded-xl px-1 ease-out duration-500 ml-3 font-semibold hover:text-red-600 hover:bg-gray-50 hover:scale-125" onClick={()=>delBookmark(index)}>Delete</button>
                  </div>
                ))}
              </div>
            </Modal>
          </div>
      </div>
    </motion.div>
  );
}
