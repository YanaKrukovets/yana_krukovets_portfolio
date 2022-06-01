import React from 'react';
import TreeDetails from './TreeDetails';

const Trees = () => {
    return (
        <>           
            <TreeDetails className="tree treeBack tree1" />
            <TreeDetails className="tree treeBack tree2" />
            <TreeDetails className="tree treeBack tree3" />
            <TreeDetails className="tree treeMid tree1" />
            <TreeDetails className="tree treeMid tree2" />
            <TreeDetails className="tree treeMid tree3" />
            <TreeDetails className="tree treeFront tree1" />
            <TreeDetails className="tree treeFront tree2" />
            <TreeDetails className="tree treeFront tree3" />             
        </>
    );
}

export default Trees;
