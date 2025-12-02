import CategoryBox from "@/components/category/CategoryBox"
import { useCategory } from "@/entities/category/useCategory";
import { View } from "react-native";
import styled from "styled-components"


export default function Category() {
	const { data, isLoading, isError, error } = useCategory();
	const categories = Array.isArray(data) ? data : [];

    return (
        
        <Container>
            {categories.map((c,i) => (

            <CategoryBox key={i} image={c.postImage} categoryName={c.name} viewerCount={c.streamCount} liveCount={c.streamCount} categoryId={c.id}/>
            ))}
        </Container>
    )
}

const Container = styled(View)`
    width: 100%;
    padding: 16px 16px;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
`