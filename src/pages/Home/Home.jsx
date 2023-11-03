import { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { setOpenPageCreateForm } from '~/redux/page/pageSlice';
import ListAPI from '~/services/listAPI';
import NewsAPI from '~/services/newsAPI';
import { NEWSFEED_LENGTH, TOP_LIST_LENGTH, VIEW_NAME } from '~/utils/constants';
import PageLayout from '~/layouts/PageLayout';
import { setCurrentView } from '~/redux/view/viewSlice';
import ListSlider from '~/components/Slider';
import NewsFeed from './NewsFeed';

const Home = () => {
  const [topNewPageList, setTopNewPageList] = useState([]);
  const [topNewDishList, setTopNewDishList] = useState([]);
  const [newsfeed, setNewfeed] = useState([]);
  const [apiCallsCompleted, setApiCallsCompleted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentView(VIEW_NAME.HOME));
    fetchListsFromServer(ListAPI.getTopNewPage, TOP_LIST_LENGTH, setTopNewPageList);
    fetchListsFromServer(ListAPI.getTopNewDish, TOP_LIST_LENGTH, setTopNewDishList);
    fetchListsFromServer(NewsAPI.getNewest, NEWSFEED_LENGTH, setNewfeed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchListsFromServer = async (apiFunction, listLength, setStateFunction) => {
    try {
      const response = await apiFunction(listLength);
      setStateFunction(response.data.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    if (topNewPageList.length > 0 && topNewDishList.length > 0 && newsfeed.length > 0) {
      setApiCallsCompleted(true);
    }
  }, [topNewPageList, topNewDishList, newsfeed]);

  return (
    <PageLayout>
      <div className='flex flex-col gap-4'>
        <Row gutter={16} className='mt-4'>
          <Col span={19} className='flex flex-col gap-4'>
            <ListSlider
              listData={topNewPageList}
              title='Top trang mới'
              isPageSlide
              isLoading={!apiCallsCompleted}
            />
            <ListSlider
              listData={topNewDishList}
              title='Top món mới'
              isLoading={!apiCallsCompleted}
            />
          </Col>
          <Col span={5} className='flex flex-col gap-4'>
            <div className='ct-section-wrapper flex items-end bg-create-page bg-no-repeat bg-cover bg-right h-[140px] p-1.5'>
              <Button
                type='primary'
                icon={<PlusOutlined />}
                className='w-full h-11 outline outline-white'
                onClick={() => dispatch(setOpenPageCreateForm())}
              >
                Tạo trang kinh doanh
              </Button>
            </div>
            <NewsFeed data={newsfeed} isLoading={!apiCallsCompleted} />
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
};

export default Home;
