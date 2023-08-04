
import { 
    Box,
    Text
} from "@chakra-ui/react";

export default function FiatBalance() {

    return (
        <Box border="1px solid limegreen" borderRadius="10px" padding="10px">
        <Text        
            textAlign="center"
            borderRadius="12px"
            fontWeight="700"
            fontSize="18px"
            color="limegreen"
            padding="10px"> FIAT : {} </Text>            
        </Box>
    )

}

