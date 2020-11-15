import XLSX from 'xlsx';

export default (file) => {

  return new Promise((resolve, reject) => {
  
    const reader = new FileReader();
    
    reader.onload = function (e) {
      try {
        const data = e.target.result;
        let readedData = XLSX.read(data, { type: 'binary' });
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];

        const details = XLSX.utils.sheet_to_json(ws, { header: 1 });

        const ws2name = readedData.SheetNames[1];
        const ws2 = readedData.Sheets[ws2name];

        const questions = XLSX.utils.sheet_to_row_object_array(ws2, { header: 1 });

       resolve({
          details,
          questions
        });
      } catch(error) {
        reject(error.message);
      }
    };

   reader.readAsBinaryString(file);
  })
};