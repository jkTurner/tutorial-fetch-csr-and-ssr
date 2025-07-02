import Image from "next/image";
 
interface RecipeProps {
    id: number;
    name: string;
    image: string;
    instructions: string;
}
 
async function getRecipes(): Promise<{ recipes: RecipeProps[] | null; error: string | null }> {
    try {
        const res = await fetch("https://dummyjson.com/recipes");
        if (!res.ok) {
            throw new Error(`Error fetching recipes: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        if (!data.recipes || !Array.isArray(data.recipes)) {
            throw new Error("Invalid recipe data format");
        }
        return { recipes: data.recipes, error: null };
    } catch (error) {
        console.error((error as Error).message);
        return {
            recipes: null,
            error: (error as Error).message || "Unknown error occurred",
        }
    }
}
 
export default async function FetchSSRPage() {
 
    const { recipes, error } = await getRecipes();
 
    return (
        <div className="flex flex-col gap-8 p-8">
            <h1 className="font-semibold text-lg">Fetch SSR Example</h1>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    {recipes ? (
                        <div className="cardsContainer">
                            {recipes?.map((item) => (
                                <div 
                                    key={item.id}
                                    className="flex flex-col bg-gray-700 p-4 gap-4"
                                >
                                    <h2 className="font-semibold">{item.name}</h2>
                                    <div className="w-full aspect-[5/3] relative">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="overflow-hidden object-center"
                                        />
                                    </div>
                                    <p className="text-gray-400">{item.instructions}</p>
                                </div>
                            ))}
                        </div>
 
                    ) : (
                        <p>No recipes found</p>
                    )}
                </>
            )}
        </div>
    )
}