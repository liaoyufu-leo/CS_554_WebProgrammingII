import { gql } from '@apollo/client';

const home = gql`
    query UnsplashImages($pageNum: Int) {
        unsplashImages(pageNum: $pageNum) {
        id
        url
        posterName
        description
        userPosted
        binned
        numBinned
        }
    }
`;

const mybin = gql`
    query binnedImages{
        binnedImages{
        id
        url
        posterName
        description
        userPosted
        binned
        numBinned
        }
    }
`;

const myposts = gql`
    query userPostedImages{
        userPostedImages{
        id
        url
        posterName
        description
        userPosted
        binned
        numBinned
        }
    }
`;

let exported = {
    home: home,
    mybin: mybin,
    myposts: myposts
};

export default exported;
