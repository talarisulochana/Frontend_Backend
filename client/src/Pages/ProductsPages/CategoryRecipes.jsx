
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../../Toolkit/Feactures/RecipesRedux/RecipeSlice';
import { useLocation } from 'react-router-dom';
import Image from '../../Compontents/Image/imag';

 function CategoryRecipes() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { recipes, loading } = useSelector((state) => state.recipes);

 
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('type') || 'All';

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipes.length]);

  const filteredRecipes =
    selectedCategory === 'All'
      ? recipes
      : recipes.filter(
          (recipe) =>
            recipe.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="p-6 pt-30">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
        {selectedCategory} 
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : filteredRecipes.length === 0 ? (
        <p className="text-center text-gray-500">No recipes found in this category.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 border rounded shadow bg-white"
            >
              {recipe.image && (
                <Image
                  path={recipe.image}
                  alt={recipe.title}
                  styling="w-full h-64 object-cover rounded mb-2"
                />
              )}
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-lg font-bold mb-1">{recipe.title}</h2>
                <p className="text-xs text-gray-600 mb-1">
                  <strong>Category:</strong> {recipe.category}
                </p>
                <p className="mt-1 text-xs">
                  <strong>Cost:</strong> ₹{recipe.cost}
                </p>
                <p className="mt-1 text-xs">
                  <strong>Editor:</strong> {recipe.editorName}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default CategoryRecipes