import { Breadcrumb, Button, Col, Form, Radio, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { connect, useDispatch,Link,history } from "umi";
import styles from "./index.less";
// import SoundSwiper from "../../components/SoundSwiper";

const { Option } = Select;


const OneDriveList = (props) => {

  const [form] = Form.useForm();
  const [expendKeyArr, setExpendKeyArr] = useState([]);
  const [listData,setListData] = useState([])
  const [nextPage,setNextPage] = useState(props.oneDrive.next)

  // const [pagination, setPagination] = useState({
  //   page: 1,
  //   pageSize: 10,
  // });
  const [formValues, setFormValues] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    loadData();
    // fetchData;
    return () => {
      // cleanup
    };
  }, [formValues]);

  useEffect(()=>{
    // console.log(props.oneDrive.data);
    setNextPage(props.oneDrive.next)
    if(listData!==props.oneDrive.data){
      setListData([...listData,...props.oneDrive.data])
    }
  },[props.oneDrive])
  // useEffect(() => {
  //    console.log(expendKeyArr);
  // }, [expendKeyArr]);

  const loadData = (type) => {
    let params = {
      // ...pagination,
      ...formValues,
    };
    // if (type !== "first") {
    //   params.page = pagination.page;
    // } else {
    //   params.page = 1;
    // }
    if(Object.keys(props.match.params).length >0 ){
      params.path=props.match.params.path
    }

    dispatch({
      type: "oneDrive/fetchData",
      payload: { ...params },
    });
  };

  const valueChange = (changeValues, allValues) => {
    // console.log(changeValues, allValues);
    setFormValues({ ...allValues });
  };

  const searchNext=()=>{
    dispatch({
      type:'oneDrive/fetchData',
      payload: { next:nextPage }
    })
  }

  const returnMain=(url)=>{
   // history.push('/oneDrive/list')
    dispatch({
      type:'oneDrive/goPage',
      payload:{
        url
      }
    })
  }




  const show = (expanded, record) => {
    // console.log(expanded, record);
  };
  const rowChange = (expandedRows) => {
    if (expandedRows.length > 1) {
      setExpendKeyArr(expandedRows.slice(1, 2));
    } else {
      setExpendKeyArr(expandedRows);
    }
  };

  const handleClick=(e)=>{
    console.log("-> e", e);

  }

  // const handleChange = (pagination, filtersArg, sorter) => {
  //   const filters = Object.keys(filtersArg).reduce((obj, key) => {
  //     const newObj = { ...obj };
  //     const value = this.getValue(filtersArg[key]);
  //     if (value) {
  //       newObj[key] = value;
  //     }
  //     return newObj;
  //   }, {});
  //   setPagination({
  //     pagination: { page: pagination.current, pageSize: pagination.pageSize },
  //   });
  // };

  const columns = [
    { title: "Name", dataIndex: "name", width: 200, key: "name" },
    { title: "类型", dataIndex: "type", width: 200, key: "type" },
    { title: "大小", dataIndex: "size", width: 400, key: "size",render: (value) =>(
        value>0? <span>{(value/1024/1024).toFixed((2))} M</span>:'文件损坏'
      )
    },
    { title: "修改时间", dataIndex: "time", width: 400, key: "time" ,render: (value) =>(
        <span>{value.replace('T',' ').replace('Z','')} </span>
      )},
    {
      title: "操作",
      width: 200,
      dataIndex: "",
      key: "x",
      render: (_, record) =>
        record.type === "folder" && record.childCount > 0 ? <Button  onClick={()=>returnMain(`/oneDrive/list/${record.name}`)} >查看</Button>
          : <a href={`https://1197052014571378.cn-beijing.fc.aliyuncs.com/2016-08-15/proxy/henshangOneDrive/OneDriveApi/download?id=${record.id}`} target="_blank" rel="noopener noreferrer">下载</a>,
    },
  ];

  const {loading} = props
  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <Form
          form={form}
          name="topicBrandForm"
          onValuesChange={valueChange}
          initialValues={{ sort: "4", time: "3" }}
        >
          <Row className={styles.formRow} justify="space-between">
            <Col>
              <Breadcrumb onClick={handleClick}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="">Application Center</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>An Application</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
        </Form>
        <Table
          style={{
            overflow: "hidden",
          }}
          rowKey={record=>record.id}
          loading={loading}
          columns={columns}
          expandRowByClick
          pagination={false}
          // expandable={{
          //   expandedRowRender: (record) => (
          //     <div style={{ width: "calc(80vw - 32px)" }}>
          //       <SoundSwiper />
          //     </div>
          //   ),
          //   onExpand: show,
          //   onExpandedRowsChange: rowChange,
          //   expandedRowKeys: expendKeyArr,
          // }}
          dataSource={listData}
        />
      </div>
    </div>
  )
};
export default connect(({ oneDrive, loading })=> ({
  oneDrive,
  loading: loading.effects["oneDrive/fetchData"],
}))(OneDriveList)
