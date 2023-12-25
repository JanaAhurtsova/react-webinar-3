import {memo, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import shallowequal from 'shallowequal';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from "prop-types";
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import articleActions from '../../store-redux/article/actions';
import commentsAction from "../../store-redux/comments/actions";
import Comments from '../../containers/comments';
import useTranslate from '../../hooks/use-translate';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();
  const {lang, t} = useTranslate();

  useInit(async () => {
    await Promise.all([
      dispatch(articleActions.load(params.id)),
      dispatch(commentsAction.load(params.id))
    ])
  }, [lang, params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект


  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
      <Comments articleId={params.id} />
    </PageLayout>
  );
}

export default memo(Article);
