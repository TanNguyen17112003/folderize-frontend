declare module 'pptx2json' {
  import JSZip from 'jszip';

  interface Slide {
    data: string;
  }

  interface Pptx {
    slides: Slide[];
  }

  function pptx2json(zip: JSZip): Promise<Pptx>;

  export default pptx2json;
}
