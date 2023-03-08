export default function CabinUbication(): JSX.Element {
  return (
    <div className="map">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d394.8679397431728!2d-54.2166449149564!3d-27.288325200312634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1678302247952!5m2!1ses!2sar" 
        width="600"  
        height="450" 
        loading="lazy"  
        referrerPolicy="no-referrer-when-downgrade" />
    </div>
  );
}