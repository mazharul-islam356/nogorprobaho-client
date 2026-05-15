"use client";

export default function CategoryTree({ tree }) {
  const renderTree = (nodes) => {
    return (
      <ul className="ml-4 list-disc">
        {nodes.map((node) => (
          <li key={node._id}>
            {node.name}
            {node.subCategories.length > 0 && renderTree(node.subCategories)}
          </li>
        ))}
      </ul>
    );
  };

  return <div>{renderTree(tree)}</div>;
}
