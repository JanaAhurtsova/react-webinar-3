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

function Article({translate}) {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();
  const {lang, setLang, t} = translate;

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
      <TopHead t={t} />
      <Head title={select.article.title}>
        <LocaleSelect setLang={setLang} lang={lang} />
      </Head>
      <Navigation t={t} />
      <Spinner active={select.waiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
      <Comments articleId={params.id} t={t} />
    </PageLayout>
  );
}

Article.propTypes = {
  translate: PropTypes.shape({
    lang: PropTypes.string,
    setLang: PropTypes.func,
    t: PropTypes.func
  })
}

export default memo(Article);
