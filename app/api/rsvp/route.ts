// app/api/rsvp/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, name, attending } = await request.json();

    // Validate required fields
    if (!email || !name || !attending) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'contact@ongaki.website';
    
    const { data, error } = await resend.emails.send({
        from: `Kimberly & Anesu <${fromEmail}>`,
        to: email,
        subject: attending === 'yes' ? 'We\'re Thrilled You\'re Coming!' : 'Noted With Love, We\'ll Miss You!',
        html: `
        <!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Montserrat:wght@300;400;500&display=swap');
                @keyframes pulse-scale {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                .color-circle {
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    margin: 0 4px;
                    border: 1px solid rgba(0,0,0,0.1);
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }
                .color-circle:hover {
                    transform: scale(1.2);
                }
                .pulsing {
                    animation: pulse-scale 1.8s ease-in-out infinite;
                    box-shadow: 0 0 0 2px rgba(255,255,255,0.5);
                }
            </style>
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif; color: #555; background-color: #fcfaf7;">
            <div style="max-width: 100%; margin: 0 auto; padding: 5% 5% 5% 5%;">
                
                
                
                <!-- Main content card -->
                <div style="background: white; border-radius: 30px; box-shadow: 0 5px 15px rgba(0,0,0,0.15); border: 1px solid rgba(0,0,0,0.15);">
                    
                    <!-- Full-width -->
                    <div style="text-align: center; margin: 0; overflow: hidden; border-radius: 30px 30px 0 0;">
                        <img src="https://i.ibb.co/Xr5LZcc4/email-banner.webp" alt="Kimberly & Anesu" style="width: 100%; max-width: 100%; object-fit: cover; display: block;">
                    </div>
                    
                    <!-- Content with padding -->
                    <div style="padding: 8%;">
                    
                    <!-- Wedding title -->
                    <h1 style="font-family: 'Playfair Display', serif; color: #555; font-size: 24px; text-align: center; margin: 0 0 25px 0; letter-spacing: 1px;">
                        The Wedding of<br>Kimberly & Anesu
                    </h1>
                    
                    <!-- Decorative divider -->
                    <div style="display: flex; justify-content: center; margin-bottom: 30px;">
                        <div style="height: 1px; width: 10%; background: #d0a548; margin: 0 auto;"></div>
                    </div>
                    
                    <!-- RSVP confirmation -->
                    <div style="text-align: center; margin-bottom: 30px; background-color: #faf6f0; border: 1px solid #e8d9c0; border-radius: 8px; padding: 10px; position: relative; overflow: hidden;">
                    <!-- Decorative corner elements -->
                    <!--<div style="position: absolute; top: 0; left: 0; width: 30px; height: 30px; border-top: 2px solid #d0a548; border-left: 2px solid #d0a548; border-radius: 8px 0 0 0;"></div>-->
                    <!--<div style="position: absolute; top: 0; right: 0; width: 30px; height: 30px; border-top: 2px solid #d0a548; border-right: 2px solid #d0a548; border-radius: 0 8px 0 0;"></div>-->
                    <!--<div style="position: absolute; bottom: 0; left: 0; width: 30px; height: 30px; border-bottom: 2px solid #d0a548; border-left: 2px solid #d0a548; border-radius: 0 0 0 8px;"></div>-->
                    <!--<div style="position: absolute; bottom: 0; right: 0; width: 30px; height: 30px; border-bottom: 2px solid #d0a548; border-right: 2px solid #d0a548; border-radius: 0 0 8px 0;"></div>-->
                    
                    <!-- Content -->
                    <h2 style="color: #b5824e; font-size: 18px; margin-bottom: 8px; font-weight: 600; font-family: 'Playfair Display', serif;">
                        ${attending === 'yes' ? 'Your RSVP is Confirmed!' : 'Thank You for Responding'}
                    </h2>
                    
                    <div style="width: 30%; height: 1px; background: #d0a548; margin: 12px auto 12px;"></div>
                    
                    <p style="color: #7a6a5a; font-size: 12px; margin-top: 0;">
                        ${attending === 'yes' ? 'We can\'t wait to celebrate with you!' : 'We appreciate you letting us know'}
                    </p>
                </div>
                    
                    <!-- Personal greeting -->
                    <p style="font-size: 14px; line-height: 1.7; margin-bottom: 10px;">
                        <span style="font-weight: 500;">Hey ${name}</span>,
                    </p>
                    
                    <p style="font-size: 14px; line-height: 1.7; margin-bottom: 25px;">
                        ${attending === 'yes' 
                            ? 'We\'re absolutely thrilled to know you\'ll be there on our wedding day. Having you with us as we take this big step means more than words can say. We can\'t wait to celebrate, laugh, and make beautiful memories together. Your presence is truly a gift.' 
                            : 'While we\'ll truly miss having you with us on our big day, we understand and appreciate you letting us know. Your response means a great deal, and we\'re grateful for your love and well wishes from afar. You’ll be with us in spirit as we celebrate.'}
                    </p>
                    
                    ${attending === 'yes' ? `
                    <!-- Wedding details card -->
                    <div style="background: #f9f5f0; padding: 25px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #d0a548; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
                    <!-- Wedding Details Section -->
                    <div style="margin-bottom: 25px;">
                        <h3 style="font-family: 'Playfair Display', serif; color: #b5824e; margin-top: 0; font-size: 18px; font-weight: 600; text-align: center; letter-spacing: 1px;">
                            📅 WEDDING DETAILS
                        </h3>
                        <div style="width: 60px; height: 1px; background: #d0a548; margin: 8px auto 15px;"></div>
                        
                        <!-- Centered table container -->
                        <div style="text-align: center;">
                            <!-- Table with fixed width for better centering -->
                            <table align="center" style="border-collapse: collapse; font-size: 14px; color: #555; width: auto; margin: 0 auto; text-align: left;">
                                <tr>
                                    <td style="padding: 8px 5px; width: 0px; vertical-align: top; color: #b5824e; font-weight: 500; text-align: right;">Date:</td>
                                    <td style="padding: 8px 5px;">Thursday, January 1st, 2026</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 5px; color: #b5824e; font-weight: 500; text-align: right;">Time:</td>
                                    <td style="padding: 8px 5px;">11:00 AM</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 5px; color: #b5824e; font-weight: 500; text-align: right;">Venue:</td>
                                    <td style="padding: 8px 5px;">
                                        Venue Umwinzii, Harare, Zimbabwe
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                
                    <!-- Divider -->
                    <div style="height: 1.5px; background: linear-gradient(to right, transparent, #d0a54880, transparent); margin: 20px 0;"></div>
                
                    <!-- Dress Code Section -->
                    <div style="margin-bottom: 25px;">
                        <h3 style="font-family: 'Playfair Display', serif; color: #b5824e; margin-top: 0; font-size: 18px; font-weight: 600; text-align: center; letter-spacing: 1px;">
                            👗 DRESS CODE
                        </h3>
                        <div style="width: 60px; height: 1px; background: #d0a548; margin: 8px auto 15px;"></div>
                        
                        <p style="font-size: 14px; line-height: 1.6; color: #555; text-align: center; margin-bottom: 15px;">
                            We kindly encourage you to wear these elegant colors for our special day:
                        </p>
                        
                        <!-- Color Palette -->
                        <div style="text-align: center; margin: 20px 0;">
                            <!-- First Row -->
                            <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 12px;">
                                <tr>
                                    <td style="padding: 0 5px;">
                                        <span class="color-circle pulsing" style="display: inline-block; width: 28px; height: 28px; border-radius: 50%; background-color: #eae3d9; border: 1px solid rgba(0,0,0,0.1);"></span>
                                    </td>
                                    <td style="padding: 0 5px;">
                                        <span class="color-circle pulsing" style="display: inline-block; width: 28px; height: 28px; border-radius: 50%; background-color: #d8b59a; border: 1px solid rgba(0,0,0,0.1);"></span>
                                    </td>
                                    <td style="padding: 0 5px;">
                                        <span class="color-circle pulsing" style="display: inline-block; width: 28px; height: 28px; border-radius: 50%; background-color: #d6c1ad; border: 1px solid rgba(0,0,0,0.1);"></span>
                                    </td>
                                    <td style="padding: 0 5px;">
                                        <span class="color-circle pulsing" style="display: inline-block; width: 28px; height: 28px; border-radius: 50%; background-color: #cbbfb8; border: 1px solid rgba(0,0,0,0.1);"></span>
                                    </td>
                                    <td style="padding: 0 5px;">
                                        <span class="color-circle pulsing" style="display: inline-block; width: 28px; height: 28px; border-radius: 50%; background-color: #9c8e85; border: 1px solid rgba(0,0,0,0.1);"></span>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Row -->
                            <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                                <tr>
                                    <td style="padding: 0 5px;">
                                        <span class="color-circle pulsing" style="display: inline-block; width: 28px; height: 28px; border-radius: 50%; background-color: #c4b3a2; border: 1px solid rgba(0,0,0,0.1);"></span>
                                    </td>
                                    <td style="padding: 0 5px;">
                                        <span class="color-circle pulsing" style="display: inline-block; width: 28px; height: 28px; border-radius: 50%; background-color: #c97c56; border: 1px solid rgba(0,0,0,0.1);"></span>
                                    </td>
                                    <td style="padding: 0 5px;">
                                        <span class="color-circle pulsing" style="display: inline-block; width: 28px; height: 28px; border-radius: 50%; background-color: #7c8269; border: 1px solid rgba(0,0,0,0.1);"></span>
                                    </td>
                                    <td style="padding: 0 5px;">
                                        <span class="color-circle pulsing" style="display: inline-block; width: 28px; height: 28px; border-radius: 50%; background-color: #7d8370; border: 1px solid rgba(0,0,0,0.1);"></span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        
                    </div>
                
                    <!-- Divider -->
                    <div style="height: 1.5px; background: linear-gradient(to right, transparent, #d0a54880, transparent); margin: 20px 0;"></div>
                
                    <!-- Venue Directions Section -->
                    <div style="margin-bottom: 25px;">
                    <h3 style="font-family: 'Playfair Display', serif; color: #b5824e; margin-top: 0; font-size: 18px; font-weight: 600; text-align: center; letter-spacing: 1px;">
                        📍 VENUE DIRECTIONS
                    </h3>
                    <div style="width: 60px; height: 1px; background: #d0a548; margin: 8px auto 15px;"></div>
                    
                    <!-- Centered table container -->
                    <div style="text-align: center;">
                        <!-- Table with directions -->
                        <table align="center" style="border-collapse: collapse; font-size: 14px; color: #555; width: 100%; margin: 0 auto; text-align: left;">
                            <tr>
                                <td style="padding: 8px 5px; vertical-align: top; width: 0px;"></td>
                                <td style="padding: 8px 5px;">
                                    <strong>From town:</strong> Take Enterprise Road past Chisipite Shops.
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 5px; vertical-align: top;"></td>
                                <td style="padding: 8px 5px;">
                                    <strong>Continue straight:</strong> To Redan Service Station at Chishawasha Hills turn-off.
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 5px; vertical-align: top;"></td>
                                <td style="padding: 8px 5px;">
                                    <strong>Turn left:</strong> Immediately after the station onto Umwinsidale Road.
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 5px; vertical-align: top;"></td>
                                <td style="padding: 8px 5px;">
                                    <strong>Final turn:</strong> Left into Venue Umwinzii just before the bridge.
                                </td>
                            </tr>
                        </table>
                    </div>

                    <!-- Maps button -->
                    <div style="text-align: center; margin-top: 25px;">
                                                <a href="https://maps.app.goo.gl/TLEoiFe4CojrP5Hi8?g_st=ipc" 
                                                style="display: inline-block; 
                                                        padding: 6px 12px; 
                                                        background-color: rgba(181, 130, 78, 0.1); 
                                                        color: #a07242; 
                                                        font-size: 12px; 
                                                        font-weight: 500; 
                                                        text-decoration: none; 
                                                        border-radius: 12px; 
                                                        border: 1.5px solid #a07242;
                                                        transition: all 0.3s ease;">
                                                    OPEN IN MAPS
                                                </a>
                                            </div>
                </div>
                    
                </div>
                    ` : ''}
                    
                    <!-- Regards -->
                    <p style="font-size: 14px; line-height: 1.7; margin-bottom: 25px;">
                        With love and gratitude,<br>
                        <span style="font-family: 'Playfair Display', serif; color: #b5824e; font-size: 16px;">Kimberly & Anesu</span>
                    </p>
                    
                    <!-- Save the Date -->
                    ${attending === 'yes' ? `
                    <div style="text-align: center; margin-top: 5%; padding-top: 20px; border-top: 1px dashed #e8c8a0;">
                        <!-- Wedding Logo -->
                        <div style="text-align: center; margin-bottom: 1%;">
                            <img src="https://i.ibb.co/Y7gKd5CT/kim-anesu.png" alt="Kimberly & Anesu" style="max-width: 10%; border-radius: 8px 8px 0 0;">
                        </div>
                        <p style="font-size: 14px; color: #888; margin-bottom: 5px;">SAVE THE DATE</p>
                        <div style="display: inline-block; background: #f9f5f0; padding: 8px 15px; border-radius: 20px;">
                            <p style="margin: 0; font-weight: 500; color: #d0a548; font-size: 15px;">January 1, 2026 • 11:00 AM</p>
                        </div>
                    </div>
                    ` : ''}
                    
                </div>
                
                <!--digiREB Banner-->
                <!--<div style="text-align: center; margin-bottom: -10px; overflow: hidden; border-radius: 0 0 30px 30px;">-->
                <!--  <a href="https://digi.reb.ac" target="_blank" style="display: inline-block; text-decoration: none;">-->
                <!--    <img -->
                <!--      src="https://i.ibb.co/MD0q993Z/digireb-banner.webp" -->
                <!--      alt="Transforming ideas into digital reality." -->
                <!--      style="width: 100%; max-width: 100%; object-fit: cover; display: block; border: 0;"-->
                <!--    >-->
                <!--  </a>-->
                <!--</div>-->
                
            </div>
                
                <!-- Footer -->
                <div style="margin-top: 20px; margin-bottom: 20px; text-align: center; color: #888; font-size: 14px; padding-top: 20px;">
                    <p style="margin: 0;">
                        Designed and developed by 
                        <a href="https://digi.reb.ac" target="_blank" style="text-decoration: none;">digiREB</a>
                        </p>
                </div>
            </div>
            </body>
            </html>
        `,
        });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}