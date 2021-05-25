import {cleanName} from '../../HelperFunctions/Indexing'
import {BannerContainer, Summary} from './Style'


const Banner = ({year, boundary, index, count}) => {
    return (
        <BannerContainer>
            <h2>{year}</h2>
            <Summary>
                <div>
                    <p>{cleanName(boundary)}{boundary == 'boroughs' ? '' : ' #'}: </p>
                    <p>{index}</p>
                </div>
                <div>
                    <p>Crime Count: </p>
                    <p>{count}</p>
                </div>
            </Summary>
        </BannerContainer>
    );
}
 
export default Banner;