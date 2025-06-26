'use client'
import { useEffect, useState } from "react"

interface RecipeProps {
    id: number;
    name: string;
    instructions: string;
    image: string;
}

export default function FetchCSRPage() {

    const [recipes, setRecipes] = useState<RecipeProps[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getRecipes = async () => {
            setLoading(true);
            try {
                const res = await fetch("https://dummyjson.com/recipes");
                if (!res.ok) {
                    throw new Error(`Error occured! Status: ${res.status} ${res.statusText}`);
                };
                const recipeData = await res.json();
                setRecipes(recipeData.recipes);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        }
        getRecipes();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-lg font-semibold">Fetch CSR Method</h1>
            {loading && <p>Loading...</p>}
            {recipes.length > 0 && (
                <>
                    {recipes.map((recipe) => (
                        <div key={recipe.id}>
                            <p>{recipe.name}</p>
                        </div>
                    ))}
                </>
            )}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}