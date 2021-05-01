const removePropsFromObject = (obj, props) => {
    const newObj = {};
    Object.keys(obj).map((prop) => {
        if (!props.includes(prop)) {
            newObj[prop] = obj[prop];
        }
    });
    return newObj;
};

module.exports.removePropsFromObject = removePropsFromObject;
