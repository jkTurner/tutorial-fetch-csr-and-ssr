interface RecipeProps {
    id: number;
    name: string;
    instructions: string;
    image: string;
}

export default async function FetchSSRPage() {

    const getRecipes = async (): Promise<RecipeProps[] | null> => {
        try {
            const res = await fetch("https://dummyjson.com/recipes");
            if (!res.ok) {
                throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            return data.recipes;
        } catch (error) {
            console.error("Fetch error:", (error as Error).message);
            return null;
        }
    };

    const recipes = await getRecipes();

    return (
        <div className="p-8">
            <h1 className="text-lg font-semibold">Fetch SSR Method</h1>

            {!recipes ? (
                <p className="text-red-500">Failed to load recipes.</p>
            ) : recipes.length === 0 ? (
                <p>No recipes found.</p>
            ) : (
                recipes.map((recipe) => (
                    <div key={recipe.id}>
                    <p>{recipe.name}</p>
                    </div>
                ))
            )}

        </div>
    );
}