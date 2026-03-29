import { Routes, Route } from "react-router-dom";

import {
    AuthLayout,
    AdminLayout,
    UserLayout,
} from "./layouts";

import {
    LoginPage,
    RegisterPage,
    DriverVerificationPage,

    CarsMapPage,
    CarDetailsUserPage,

    BookingDatePage,
    BookingPaymentPage,
    BookingConfirmationPage,

    CarAccessPage,

    CarConditionStartPage,
    CarConditionEndPage,

    TripPage,
    TripSummaryPage,

    TripsHistoryPage,
    TripHistoryDetailsPage,

    BookingsHistoryPage,
    BookingHistoryDetailsPage,

    ProfilePage,
    ProfileEditPage,

    SupportPage,

    DashboardPage,
    MonitoringPage,

    CarsManagementPage,
    CarDetailsPage,
    CarCreatePage,
    CarEditPage,

    UsersManagementPage,
    UserDetailsPage,

    BookingsManagementPage,
    BookingDetailsPage,

    TripsManagementPage,
    TripsDetailsPage,

    CarConditionDetailsPage,
} from "./pages";

import { ProtectedRoute, PublicRoute } from "./routes";

export const App = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/auth/login" element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                }/>

                <Route path="/auth/register" element={
                    <PublicRoute redirectTo="/auth/driver-verification">
                        <RegisterPage />
                    </PublicRoute>
                }/>

                <Route path="/auth/driver-verification" element={
                    <ProtectedRoute>
                        <DriverVerificationPage />
                    </ProtectedRoute>
                }/>
            </Route>

            <Route element={<UserLayout />}>
                <Route path="/" element={
                    <ProtectedRoute userOnly>
                        <DashboardPage />
                    </ProtectedRoute>
                }/>

                <Route path="profile">
                    <Route index element={
                        <ProtectedRoute userOnly>
                            <ProfilePage />
                        </ProtectedRoute>
                    }/>

                    <Route path="edit" element={
                        <ProtectedRoute userOnly>
                            <ProfileEditPage />
                        </ProtectedRoute>
                    }/>
                </Route>

                <Route path="cars">
                    <Route path="map" element={
                        <ProtectedRoute userOnly>
                            <CarsMapPage />
                        </ProtectedRoute>
                    }/>

                    <Route path=":id" element={
                        <ProtectedRoute userOnly>
                            <CarDetailsUserPage />
                        </ProtectedRoute>
                    }/>
                </Route>

                <Route path="booking">
                    <Route path="date" element={
                        <ProtectedRoute userOnly>
                            <BookingDatePage />
                        </ProtectedRoute>
                    }/>

                    <Route path="payment" element={
                        <ProtectedRoute userOnly>
                            <BookingPaymentPage />
                        </ProtectedRoute>
                    }/>

                    <Route path="confirm" element={
                        <ProtectedRoute userOnly>
                            <BookingConfirmationPage />
                        </ProtectedRoute>
                    }/>
                </Route>

                <Route path="bookings">
                    <Route path="history">
                        <Route index element={
                            <ProtectedRoute userOnly>
                                <BookingsHistoryPage />
                            </ProtectedRoute>
                        }/>

                        <Route path=":id" element={
                            <ProtectedRoute userOnly>
                                <BookingHistoryDetailsPage />
                            </ProtectedRoute>
                        }/>
                    </Route>
                </Route>

                <Route path="car-access" element={
                    <ProtectedRoute userOnly>
                        <CarAccessPage />
                    </ProtectedRoute>
                }/>

                <Route path="car-condition">
                    <Route path="start" element={
                        <ProtectedRoute userOnly>
                            <CarConditionStartPage />
                        </ProtectedRoute>
                    }/>

                    <Route path="end" element={
                        <ProtectedRoute userOnly>
                            <CarConditionEndPage />
                        </ProtectedRoute>
                    }/>
                </Route>

                <Route path="trip">
                    <Route index element={
                        <ProtectedRoute userOnly>
                            <TripPage />
                        </ProtectedRoute>
                    }/>

                    <Route path="summary" element={
                        <ProtectedRoute userOnly>
                            <TripSummaryPage />
                        </ProtectedRoute>
                    }/>
                </Route>

                <Route path="trips">
                    <Route path="history">
                        <Route index element={
                            <ProtectedRoute userOnly>
                                <TripsHistoryPage />
                            </ProtectedRoute>
                        }/>

                        <Route path=":id" element={
                            <ProtectedRoute userOnly>
                                <TripHistoryDetailsPage />
                            </ProtectedRoute>
                        }/>
                    </Route>
                </Route>

                <Route path="support" element={
                    <ProtectedRoute userOnly>
                        <SupportPage />
                    </ProtectedRoute>
                }/>
            </Route>

            <Route element={<AdminLayout />}>
                <Route path="/dashboard" element={
                    <ProtectedRoute adminOnly>
                        <DashboardPage />
                    </ProtectedRoute>
                }/>

                <Route path="/monitoring" element={
                    <ProtectedRoute adminOnly>
                        <MonitoringPage />
                    </ProtectedRoute>
                }/>

                <Route path="cars">
                    <Route index element={
                        <ProtectedRoute adminOnly>
                            <CarsManagementPage />
                        </ProtectedRoute>
                    }/>

                    <Route path="add" element={
                        <ProtectedRoute adminOnly>
                            <CarCreatePage />
                        </ProtectedRoute>
                    }/>

                    <Route path=":id" element={
                        <ProtectedRoute adminOnly>
                            <CarDetailsPage />
                        </ProtectedRoute>
                    }/>

                    <Route path=":id/edit" element={
                        <ProtectedRoute adminOnly>
                            <CarEditPage />
                        </ProtectedRoute>
                    }/>
                </Route>

                <Route path="/users">
                    <Route index element={
                        <ProtectedRoute adminOnly>
                            <UsersManagementPage />
                        </ProtectedRoute>
                    }/>

                    <Route path=":id" element={
                        <ProtectedRoute adminOnly>
                            <UserDetailsPage />
                        </ProtectedRoute>
                    }/>
                </Route>

                <Route path="bookings">
                    <Route index element={
                        <ProtectedRoute adminOnly>
                            <BookingsManagementPage />
                        </ProtectedRoute>
                    }/>

                    <Route path=":id" element={
                        <ProtectedRoute adminOnly>
                            <BookingDetailsPage />
                        </ProtectedRoute>
                    }/>
                </Route>

                <Route path="trips">
                    <Route index element={
                        <ProtectedRoute adminOnly>
                            <TripsManagementPage />
                        </ProtectedRoute>
                    }/>

                    <Route path=":id" element={
                        <ProtectedRoute adminOnly>
                            <TripsDetailsPage />
                        </ProtectedRoute>
                    }/>
                </Route>

                <Route path="car-condition">
                     <Route path=":id" element={
                        <ProtectedRoute adminOnly>
                            <CarConditionDetailsPage />
                        </ProtectedRoute>
                    }/>
                </Route>
            </Route>
        </Routes>
    );
}