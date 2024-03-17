<?php
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\RolesController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Role;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/roles', [RolesController::class, 'index']);
Route::get('/categories', [CategoriesController::class, 'index']);

Route::delete('/categories/{id}', [CategoriesController::class, 'destroy']);
Route::put('/categories/{category}', [CategoriesController::class, 'update']);
Route::post('/categories', [CategoriesController::class, 'store']);


Route::get('/events', [EventsController::class, 'index']);
Route::put('/events/{id}', [EventsController::class, 'update']);
Route::post('/reservations', [ReservationController::class, 'make_a_reservation']);

Route::delete('/events/{event}', [EventsController::class, 'destroy']);
Route::put('/events/{eventId}/accept', [EventsController::class, 'acceptEvent']);
Route::put('/events/{eventId}/deny', [EventsController::class, 'denyEvent']);

Route::get('reservation/{id}',[ReservationController::class, 'show']);
Route::put('reservation/{id}',[ReservationController::class, 'update']);
Route::delete('delete/{id}',[ReservationController::class, 'destroy']);

Route::get('/user-role/{id}', function ($id) {
    // Get the user by ID
    $user = User::findOrFail($id);

    if ($user) {
        // Get the user's roles
        $roleName = $user->getRoleNames()->toArray();
        return response()->json(['role' => $roleName]);
    } else {
        return response()->json(['error' => 'User not found'], 404);
    }
});

