import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleRecipe  } from '../../Toolkit/Feactures/RecipesRedux/SingleRecipeSlice';


function SingleRecipe() {
  const { id } = useParams();
  const dispatch = useDispatch();
const { singleRecipe, loading } = useSelector(state => state.singleRecipe);



  useEffect(() => {
    dispatch(fetchSingleRecipe(id));
  }, [dispatch, id]);

  if (loading || !singleRecipe) return <p>Loading recipe...</p>;

  return (
    <>

<div className="p-6 max-w-2xl mx-auto text-center pt-30"></div>
<div className="max-w-3xl mx-auto px-4 py-10 text-center top- bg-white shadow-lg rounded-lg">

  <img
    src={singleRecipe.image}
    alt={singleRecipe.title }
    className="w-full max-w-md h-80 object-cover rounded-lg mx-auto mb-6"
    loading="lazy"
    referrerPolicy="no-referrer"
  />


  <h1 className="text-4xl font-extrabold text-gray-800">{singleRecipe.title}</h1>


  <p className="text-md text-gray-600 mt-2 italic">Category: {singleRecipe.category}</p>


  <div className="mt-6 text-left">
    <h2 className="text-2xl font-semibold mb-2 text-gray-800">Ingredients</h2>
    <ul className="list-disc list-inside text-gray-700">
      {singleRecipe.ingredients?.map((ing, index) => (
        <li key={index}>{ing}</li>
      ))}
    </ul>
  </div>


  <div className="mt-6 text-left">
    <h2 className="text-2xl font-semibold mb-2 text-gray-800">Cooking Steps</h2>
    <p className="text-gray-700 whitespace-pre-line">{singleRecipe.steps}</p>
  </div>

 
  <div className="mt-8  pt-4 text-gray-700">
    <p><span className="font-medium">Editor:</span> {singleRecipe.editorName}</p>
    <p><span className="font-medium">Cost:</span> ₹{singleRecipe.cost}</p>
  </div>
</div>

    </>
  );
}

export default SingleRecipe;
