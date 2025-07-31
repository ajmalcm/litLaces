import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';


export default function AccordionTransition() {

  const Summary=()=>(<div className="flex flex-col gap-3 items-start font-mono text-slate-400">
    <p>𝗡𝗼𝘁𝗲 – 𝗣𝗹𝗲𝗮𝘀𝗲 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝘂𝘀 𝗮𝘁 9902209110 𝘁𝗼 𝗖𝗼𝗻𝗳𝗶𝗿𝗺 𝘁𝗵𝗲 𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗶𝗹𝗶𝘁𝘆</p>
    <p>𝗗𝗲𝗹𝗶𝘃𝗲𝗿𝘆 𝗧𝗶𝗺𝗲 – 4 𝘁𝗼 5 𝗪𝗼𝗿𝗸𝗶𝗻𝗴 𝗱𝗮𝘆𝘀 𝗶𝗻 𝘀𝘁𝗮𝘁𝗲 𝗰𝗮𝗽𝗶𝘁𝗮𝗹𝘀 𝗮𝗻𝗱 𝗺𝗲𝘁𝗿𝗼 𝗰𝗶𝘁𝗶𝗲𝘀.</p>
    <p>5 𝘁𝗼 8 𝗪𝗼𝗿𝗸𝗶𝗻𝗴 𝗱𝗮𝘆𝘀 𝗶𝗻 𝗼𝘁𝗵𝗲𝗿 𝗹𝗼𝗰𝗮𝗹𝗶𝘁𝘆.</p>
  </div>)

  return (
    <div>
      <Accordion className='text-white bg-black py-2' style={{backgroundColor: "#0a0a0a !important", color: "white"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color:"white"}}/>}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography sx={{display:"flex",gap:'12px'}}>
            <LocalShippingOutlinedIcon/>
            <span className='font-mono tracking-wide'>SHIPPING</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
           <Summary/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
