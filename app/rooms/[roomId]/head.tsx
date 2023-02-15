import HeadTags from '../../HeadTags';

const Head = () => {
  const description: string = 'プランニングポーカーやろ〜。Tenkirに集合〜🙌';

  return (
    <>
      <HeadTags description={description} />
    </>
  );
};

export default Head;
