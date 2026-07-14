import fs from 'fs/promises';
import path from 'path';

function sanitize(name){
  return name.replace(/[^a-zA-Z0-9.]+/g,'-');
}

async function main(){
  const dir = path.resolve(process.cwd(),'public','gallery');
  const files = await fs.readdir(dir);
  for(const f of files){
    const oldPath = path.join(dir,f);
    const newName = sanitize(f);
    const newPath = path.join(dir,newName);
    if(f!==newName){
      await fs.rename(oldPath,newPath);
      console.log('Renamed',f,'->',newName);
    }
  }
}

main().catch(err=>{console.error(err); process.exit(1)});
