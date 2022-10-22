export const selectAll = (e, setData) => {
  const { checked } = e.target;
  setData((prevData) =>
    prevData.map((data) => ({
      ...data,
      checked: checked,
    }))
  );
};

export const selectGroup = (e, setData) => {
  const { checked, id } = e.target;
  //   console.log(id);
  setData((prevData) =>
    prevData.map((data) =>
      data.id.group === id ? { ...data, checked: checked } : data
    )
  );
  selectObserver(id, setData);
};

export const selectIndividual = (e, setData) => {
  const { checked, id } = e.target;
  const groupId = e.target.attributes.groupid.value;
  console.log(groupId);

  setData((prevData) =>
    prevData.map((data) =>
      data.id.individual === id ? { ...data, checked } : data
    )
  );
  // we have to run this function twice as for now
  selectObserver(groupId, setData);
  selectObserver(groupId, setData);
};

/* Select Observer to unchek all and group selectors if user first checked whole list and then uncheck any items */
export const selectObserver = (groupId, setData) => {
  setData((prevData) =>
    prevData.map((data) => {
      /* Condition to toggle all */
      if (data.type.toLowerCase() === "all") {
        let groupData = prevData.filter(
          (item) => item.type.toLowerCase() !== "all"
        );
        if (groupData.every((item) => item.checked)) {
          return { ...data, checked: true };
        } else {
          return { ...data, checked: false };
        }
      } else if (data.id.individual === groupId) {
        let groupData = prevData.filter(
          (item) => item.id.individual !== groupId && item.id.group === groupId
        );
        let res = groupData.every((item) => item.checked);
        if (res) {
          return { ...data, checked: true };
        } else {
          return { ...data, checked: false };
        }
      } else {
        return data;
      }
    })
  );
};
